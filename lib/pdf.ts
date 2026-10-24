import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export interface GeneratePdfOptions {
  filename?: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}

export async function downloadElementAsPdf(
  elementId: string,
  options: GeneratePdfOptions = {}
): Promise<boolean> {
  const {
    filename = "quotation.pdf",
    onStart,
    onSuccess,
    onError,
  } = options;

  let container: HTMLDivElement | null = null;

  try {
    onStart?.();
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element #${elementId} not found`);
    }

    const A4_WIDTH_PX = 794;

    container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-99999px";
    container.style.left = "0";
    container.style.width = `${A4_WIDTH_PX}px`;
    container.style.zIndex = "-9999";
    container.style.backgroundColor = "#ffffff";

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = `${A4_WIDTH_PX}px`;
    container.appendChild(clone);
    document.body.appendChild(container);

    await new Promise((resolve) => setTimeout(resolve, 80));

    const pageElements = Array.from(clone.querySelectorAll(".quotation-page")) as HTMLElement[];
    const targets = pageElements.length > 0 ? pageElements : [clone];

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    for (let i = 0; i < targets.length; i++) {
      const pageEl = targets[i];
      if (i > 0) {
        pdf.addPage();
      }

      const imgData = await toPng(pageEl, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        width: A4_WIDTH_PX,
        skipFonts: true,
        filter: (node) => {
          if (node instanceof HTMLElement && (node.classList?.contains("no-print") || node.classList?.contains("no-pdf"))) {
            return false;
          }
          return true;
        },
      });

      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    }

    pdf.save(filename);
    onSuccess?.();
    return true;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    onError?.(error);
    return false;
  } finally {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
}