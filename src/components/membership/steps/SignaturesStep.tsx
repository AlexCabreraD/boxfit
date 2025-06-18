import React from "react";
import { PersonalInfoStepProps } from "@/components/membership/steps/PersonalInfoStep";

const SignaturesStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const boxerCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const guardianCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawingBoxer, setIsDrawingBoxer] = React.useState(false);
  const [isDrawingGuardian, setIsDrawingGuardian] = React.useState(false);

  React.useEffect(() => {
    const initCanvas = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2; // Higher resolution for better quality
      canvas.height = rect.height * 2;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(2, 2); // Scale for high DPI
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    };

    initCanvas(boxerCanvasRef.current);
    initCanvas(guardianCanvasRef.current);
  }, []);

  const getMousePos = (
    canvas: HTMLCanvasElement,
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    isGuardian: boolean,
  ) => {
    e.preventDefault();
    const canvas = isGuardian
      ? guardianCanvasRef.current
      : boxerCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getMousePos(canvas, e);

    if (isGuardian) {
      setIsDrawingGuardian(true);
    } else {
      setIsDrawingBoxer(true);
    }

    // Start a new path - this prevents connecting to previous strokes
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    isGuardian: boolean,
  ) => {
    e.preventDefault();
    const canvas = isGuardian
      ? guardianCanvasRef.current
      : boxerCanvasRef.current;
    const isDrawing = isGuardian ? isDrawingGuardian : isDrawingBoxer;

    if (!canvas || !isDrawing) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getMousePos(canvas, e);

    // Draw line to current position
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = (isGuardian: boolean) => {
    const canvas = isGuardian
      ? guardianCanvasRef.current
      : boxerCanvasRef.current;

    if (isGuardian) {
      setIsDrawingGuardian(false);
    } else {
      setIsDrawingBoxer(false);
    }

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // End the current path
        ctx.beginPath();
      }

      // Update form data with signature
      updateFormData({
        [isGuardian ? "guardianSignature" : "boxerSignature"]:
          canvas.toDataURL(),
      });
    }
  };

  const clearSignature = (isGuardian: boolean) => {
    const canvas = isGuardian
      ? guardianCanvasRef.current
      : boxerCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      updateFormData({
        [isGuardian ? "guardianSignature" : "boxerSignature"]: "",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ boxerIdFile: file });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Signatures and Documentation
        </h2>
        <p className="text-gray-600">
          Please provide electronic signatures and upload required documents.
        </p>
      </div>

      {/* Boxer Signature */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Boxer Signature
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electronic Signature - {formData.firstName} {formData.lastName}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-gray-300 rounded-md p-2 bg-white touch-none">
              <canvas
                ref={boxerCanvasRef}
                className="w-full h-32 cursor-crosshair touch-none"
                onMouseDown={(e) => startDrawing(e, false)}
                onMouseMove={(e) => draw(e, false)}
                onMouseUp={() => stopDrawing(false)}
                onMouseLeave={() => stopDrawing(false)}
                onTouchStart={(e) => startDrawing(e, false)}
                onTouchMove={(e) => draw(e, false)}
                onTouchEnd={() => stopDrawing(false)}
                onTouchCancel={() => stopDrawing(false)}
              />
            </div>
            <div className="mt-2 flex justify-between">
              <button
                type="button"
                onClick={() => clearSignature(false)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear Signature
              </button>
              {formData.boxerSignature && (
                <span className="text-sm text-green-600">
                  ✓ Signature captured
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Sign above using your mouse or finger. You can lift and start
              again anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Guardian Signature (if minor) */}
      {formData.isMinor && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Guardian/Parent Signature
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Electronic Signature - {formData.guardianFirstName}{" "}
                {formData.guardianLastName}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-gray-300 rounded-md p-2 bg-white touch-none">
                <canvas
                  ref={guardianCanvasRef}
                  className="w-full h-32 cursor-crosshair touch-none"
                  onMouseDown={(e) => startDrawing(e, true)}
                  onMouseMove={(e) => draw(e, true)}
                  onMouseUp={() => stopDrawing(true)}
                  onMouseLeave={() => stopDrawing(true)}
                  onTouchStart={(e) => startDrawing(e, true)}
                  onTouchMove={(e) => draw(e, true)}
                  onTouchEnd={() => stopDrawing(true)}
                  onTouchCancel={() => stopDrawing(true)}
                />
              </div>
              <div className="mt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => clearSignature(true)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear Signature
                </button>
                {formData.guardianSignature && (
                  <span className="text-sm text-green-600">
                    ✓ Signature captured
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Sign above using your mouse or finger. You can lift and start
                again anywhere.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Photo ID Upload (only for adults) */}
      {!formData.isMinor && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Photo Identification
          </h3>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md mb-4">
            <p className="text-sm text-amber-800">
              <strong>Required:</strong> Please upload a photo of your valid
              government-issued ID (driver&#39;s license, passport, or state
              ID).
            </p>
          </div>
          <div>
            <label
              htmlFor="boxerIdFile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Photo ID <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="boxerIdFile"
              name="boxerIdFile"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required={!formData.isMinor}
            />
            <p className="mt-1 text-sm text-gray-500">
              Accepted formats: JPG, PNG, PDF (max 10MB)
            </p>
            {formData.boxerIdFile && (
              <p className="mt-2 text-sm text-green-600">
                ✓ File uploaded: {formData.boxerIdFile.name}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-700">
          By signing above, I acknowledge that I have read, understood, and
          agree to all terms, conditions, and waivers presented in this
          membership application.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <strong>Date:</strong> {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default SignaturesStep;
