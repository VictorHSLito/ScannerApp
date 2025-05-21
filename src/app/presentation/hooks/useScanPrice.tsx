// src/app/presentation/hooks/useScanPrice.tsx
import { useState, useEffect } from "react";
import { Camera, useCameraDevices, useFrameProcessor, CameraDevice, Frame } from "react-native-vision-camera";
import { scanOCR } from "vision-camera-ocr";
import { runOnJS } from "react-native-reanimated";

export function useScanPrice() {
  const [price, setPrice] = useState<string>("");
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  // useCameraDevices() retorna um array de dispositivos
  const devices: CameraDevice[] = useCameraDevices();
  // Pega o primeiro device disponível
  const device = devices.length > 0 ? devices[0] : undefined;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      // força conversão para string para evitar erro de tipo
      setHasPermission((status as unknown as string) === "authorized");
    })();
  }, []);

  const frameProcessor = useFrameProcessor((frame: Frame) => {
    "worklet";
    const result: any = scanOCR(frame);
    const blocks = result?.blocks || result?.result?.blocks || [];
    if (blocks.length > 0) {
      const texts = blocks.map((b: any) => b.text as string);
      const match = texts.find((t: string) => /\d+([.,]\d{2})?/.test(t));
      if (match) runOnJS(setPrice)(match);
    }
  }, []);

  return { price, hasPermission, device, frameProcessor };
}
