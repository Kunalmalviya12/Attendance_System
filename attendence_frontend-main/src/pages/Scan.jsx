import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./Scan.css";

const Scan = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
      rememberLastUsedCamera: true,
      showTorchButtonIfSupported: true,
      supportedScanTypes: [],
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
      setError(err?.message || "Error scanning QR code");
    }

    // Cleanup
    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  const handleReset = () => {
    setScanResult(null);
    setError(null);
    window.location.reload(); // Reload to restart scanner
  };

  return (
    <div className="scanner-container">
      <div className="scanner-content">
        <h1>QR Code Scanner</h1>
        <p className="scanner-subtitle">
          Position the QR code within the frame to scan
        </p>

        <div className="scanner-area">
          {!scanResult ? (
            <div id="reader"></div>
          ) : (
            <div className="result-container">
              <h3>Scan Result:</h3>
              <p className="scan-result">{scanResult}</p>
              <button className="scan-again-btn" onClick={handleReset}>
                Scan Again
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button className="retry-btn" onClick={handleReset}>
              Retry
            </button>
          </div>
        )}

        <div className="scanner-instructions">
          <h3>Instructions:</h3>
          <ol>
            <li>Allow camera access when prompted</li>
            <li>Position the QR code within the frame</li>
            <li>Hold steady until the code is scanned</li>
            <li>View the scan result below</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Scan;
