import React, { useState, useRef, useEffect } from "react";
import { FaceMesh, Results as FaceMeshResults } from "@mediapipe/face_mesh";
import { Hands, Results as HandsResults } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

interface Features {
  sexo: "M" | "F";
  gorra_deportiva: number;
  gorro_frio: number;
  gorra_mcdonalds: number;
  audifonos: number;
  lentes: number;
  lentes_sol: number;
  "color de piel": "morena" | "clara";
  cabello_corto: number;
  cabello_largo: number;
  cabello_rizado: number;
  bigote: number;
  barba_completa_corta: number;
  color_playera: string;
  cabello_castaño?: boolean;
}

export default function AvatarApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const snapshotRef = useRef<HTMLCanvasElement>(null);

  const [features, setFeatures] = useState<Features | null>(null);
  const [headAngle, setHeadAngle] = useState(0);
  const [handAngle, setHandAngle] = useState(0);
  const [blink, setBlink] = useState(false);
  const [talk, setTalk] = useState(false);

  // Toma la foto y envía al API
  async function analyzeImage() {
    const canvas = snapshotRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, 320, 240);
    const b64 = canvas.toDataURL("image/jpeg").split(",")[1];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: [{ type: "text", text: "Eres un asistente..." }],
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analiza la imagen y responde exclusivamente con un diccionario JSON:{"sexo":"M/F","gorra_deportiva":0,"gorro_frio":0,"gorra_mcdonalds":0,"audifonos":0,"lentes":0,"lentes_sol":0,"color de piel":"morena/clara","cabello_corto":1,"cabello_largo":0,"cabello_rizado":0,"bigote":0,"barba_completa_corta":0,"color_playera":"beige/black/green/ocean/pink/purple/red/sky/white/yellow"}`,
              },
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${b64}` },
              },
            ],
          },
        ],
        max_tokens: 500,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI error: ${res.statusText}`);
    const j = await res.json();
    const text = j.choices[0].message.content;
    console.log("[analyzeImage] raw response content:", text);

    const extracted =
      text.match(/```json\s*([\s\S]*?)\s*```/)?.[1] ||
      text.match(/\{[\s\S]*?\}/)?.[0];
    if (!extracted) throw new Error("No JSON in response");
    let feats: Features;
    try {
      feats = JSON.parse(extracted);
    } catch (e) {
      throw new Error("Error parsing response JSON");
    }
    setFeatures(feats);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const faceMesh = new FaceMesh({
      locateFile: (f) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const hands = new Hands({
      locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`,
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(onHandsResults);

    faceMesh.onResults((results: FaceMeshResults) => {
      if (!results.multiFaceLandmarks?.length) return;
      const lm = results.multiFaceLandmarks[0];
      // Rotación
      const dx = lm[386].x - lm[159].x;
      const dy = lm[386].y - lm[159].y;
      let raw = (-Math.atan2(dy, dx) * 180) / Math.PI;
      raw = Math.max(-30, Math.min(30, raw * 0.5));
      setHeadAngle(raw);
      // Blink
      const dist = (a: any, b: any) => Math.hypot(a.x - b.x, a.y - b.y);
      const ear =
        ((dist(lm[159], lm[145]) + dist(lm[153], lm[144])) /
          (2 * dist(lm[33], lm[133])) +
          (dist(lm[386], lm[374]) + dist(lm[380], lm[373])) /
            (2 * dist(lm[362], lm[263]))) /
        2;
      setBlink(ear < 0.3);
      // Talk
      setTalk(dist(lm[13], lm[14]) > 0.04);
    });

    const cam = new Camera(video, {
      onFrame: async () => {
        await faceMesh.send({ image: video });
        await hands.send({ image: video });
      },
      width: 320,
      height: 240,
    });
    cam.start();
    return () => {
      cam.stop();
    };
  }, []);

  function onHandsResults(results: HandsResults) {
    if (!results.multiHandLandmarks?.length) return;
    const lm = results.multiHandLandmarks[0];
    let raw =
      (Math.atan2(lm[5].y - lm[0].y, lm[5].x - lm[0].x) * 180) / Math.PI;
    raw = Math.max(-5, Math.min(5, raw * 0.8));
    setHandAngle(raw);
  }

  const src = {
    head: features
      ? `/mold-head/${
          features["color de piel"] === "morena"
            ? "head-little-brown"
            : "head-white"
        }.png`
      : "",
    blink: features
      ? `/mold-head/blink-${
          features["color de piel"] === "morena" ? "little-brown" : "head"
        }.png`
      : "",
    talk: features
      ? `/mold-head/talk-${
          features["color de piel"] === "morena" ? "little-brown" : "white"
        }.png`
      : "",
    chest: features
      ? `/mold-head/${features.color_playera.toLowerCase()}${
          ["black", "green", "sky"].includes(
            features.color_playera.toLowerCase()
          )
            ? "-shirt"
            : "-tshirt"
        }.png`
      : "",
    arm: features
      ? `/mold-head/${
          features["color de piel"] === "morena"
            ? "little-brown-hand"
            : "white-hand"
        }.png`
      : "",
    extras: features?.gorra_deportiva
      ? "/mold-head/black-cap.png"
      : features?.audifonos
      ? "/mold-head/headphones.png"
      : "",
    hair:
      features && !features.gorra_deportiva
        ? features.cabello_rizado
          ? "/mold-head/short-curly-hair.png"
          : features.cabello_largo
          ? `/mold-head/${
              features.cabello_castaño ? "brown-long-hair" : "blond-long-hair"
            }.png`
          : `/mold-head/${
              features.cabello_castaño ? "short-hair" : "blond-medium-hair"
            }.png`
        : "",
    beard: features?.barba_completa_corta
      ? "/mold-head/beard.png"
      : features?.bigote
      ? "/mold-head/mustache.png"
      : "",
    glasses: features?.lentes
      ? "/mold-head/frame-black-glasses.png"
      : features?.lentes_sol
      ? "/mold-head/sunglasses.png"
      : "",
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} className="hidden" autoPlay playsInline />
      <canvas ref={snapshotRef} width={320} height={240} className="hidden" />
      {!features && (
        <button
          onClick={() => analyzeImage().catch(console.error)}
          className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Crear Avatar
        </button>
      )}
      {features && (
        <div className="relative w-[320px] h-[240px] mt-4">
          <div
            className="absolute inset-0 origin-bottom-center"
            style={{ transform: `rotate(${headAngle}deg)` }}
          >
            <img
              src={src.head}
              className="absolute inset-0 w-full h-full"
              alt=""
            />
            <img
              src={src.chest}
              className="absolute inset-0 w-full h-full"
              alt=""
              style={{ top: "65%" }}
            />
            <div
              className="absolute inset-0 origin-center"
              style={{ transform: `rotate(${handAngle}deg)`, zIndex: 2 }}
            >
              <img
                src={src.arm}
                className="absolute inset-0 w-full h-full"
                alt=""
              />
            </div>
            {src.extras && (
              <img
                src={src.extras}
                className="absolute inset-0 w-full h-full"
                alt=""
              />
            )}
            {src.hair && (
              <img
                src={src.hair}
                className="absolute inset-0 w-full h-full"
                alt=""
              />
            )}
            {src.beard && (
              <img
                src={src.beard}
                className="absolute inset-0 w-full h-full"
                alt=""
              />
            )}
            {src.glasses && (
              <img
                src={src.glasses}
                className="absolute inset-0 w-full h-full"
                alt=""
              />
            )}
            {blink && (
              <img
                src={src.blink}
                className="absolute inset-0 w-full h-full z-10"
                alt=""
              />
            )}
            {talk && (
              <img
                src={src.talk}
                className="absolute inset-0 w-full h-full z-20"
                alt=""
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
