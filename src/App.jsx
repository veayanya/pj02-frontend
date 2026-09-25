import { useState, useCallback, useEffect, useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ModeSelector from "./components/ModeSelector.jsx";
import DropZone from "./components/DropZone.jsx";
import JobQueue from "./components/JobQueue.jsx";
import Steps from "./components/Steps.jsx";
import LibreOfficeGuide from "./components/LibreOfficeGuide.jsx";
import Footer from "./components/Footer.jsx";
import { FORMAT_GROUPS, ALL_MODES } from "./constants.js";
import { apiFetch, apiPostForm } from "./api.js";
import { pollAndDownload } from "./pollAndDownload.js";

export default function App() {
  const [serverMode, setServerMode] = useState("loading"); // loading | live | landing
  const [tools, setTools] = useState(null);

  const [mode, setMode] = useState(ALL_MODES[0].mode);
  const [files, setFiles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [globalStatus, setGlobalStatus] = useState("idle");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const currentMode = ALL_MODES.find((m) => m.mode === mode);
  const isRunning = globalStatus === "queued" || globalStatus === "processing";
  const doneCount = jobs.filter((j) => j.status === "done").length;

  useEffect(() => {
    apiFetch("/api/health")
      .then(() => {
        setServerMode("live");
        apiFetch("/api/system")
          .then((data) => setTools(data.tools))
          .catch(() => {});
      })
      .catch(() => setServerMode("landing"));
  }, []);

  const handleFiles = useCallback(
    (incoming) => {
      const arr = Array.from(incoming);
      const ext = currentMode.from.toLowerCase();
      const valid = arr.filter(
        (f) => f.name.toLowerCase().endsWith(`.${ext}`) || (ext === "html" && f.name.toLowerCase().endsWith(".htm"))
      );
      if (!valid.length) {
        setError(`Upload file berformat ${currentMode.from}.`);
        return;
      }
      setError("");
      setGlobalStatus("idle");
      setJobs([]);
      setFiles(valid);
    },
    [currentMode]
  );

  const updateJob = (jobId, status, err) => {
    setJobs((prev) => prev.map((j) => (j.jobId === jobId ? { ...j, status, error: err } : j)));
  };

  const convert = async () => {
    if (!files.length || isRunning) return;
    setGlobalStatus("queued");
    setError("");

    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("file", f));
      fd.append("mode", mode);

      const data = await apiPostForm("/api/convert", fd);
      const jobIds = data.jobIds;

      const initialJobs = jobIds.map((jobId, i) => ({
        jobId,
        filename: files[i]?.name ?? jobId,
        status: "queued",
      }));
      setJobs(initialJobs);
      setGlobalStatus("processing");

      await Promise.all(
        jobIds.map((jobId, i) =>
          pollAndDownload(jobId, (status, err) => updateJob(jobId, status, err), files[i]?.name, currentMode.to)
        )
      );

      setGlobalStatus("done");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
      setGlobalStatus("error");
    }
  };

  const reset = () => {
    setFiles([]);
    setJobs([]);
    setGlobalStatus("idle");
    setError("");
  };

  const switchMode = (m) => {
    setMode(m);
    reset();
  };

  return (
    <div className="app-shell" data-mode={serverMode}>
      <Navbar />
      <Hero serverMode={serverMode} tools={tools}>
        <div className="convert-card">
          <ModeSelector groups={FORMAT_GROUPS} activeMode={mode} onSelect={switchMode} />

          <div className="convert-card-body">
            <DropZone
              currentMode={currentMode}
              files={files}
              dragging={dragging}
              onFiles={handleFiles}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
            />

            <JobQueue jobs={jobs} />

            {error && <p className="message error">{error}</p>}

            <div className="convert-actions">
              <button
                className="btn-submit btn-submit-block"
                onClick={convert}
                disabled={!files.length || isRunning}
                aria-busy={isRunning}
              >
                {isRunning ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Mengonversi {doneCount}/{jobs.length}…
                  </>
                ) : (
                  `Konversi ke ${currentMode.to}${files.length > 1 ? ` (${files.length} file)` : ""}`
                )}
              </button>

              {(files.length > 0 || jobs.length > 0) && (
                <button className="btn-clear-outline" onClick={reset}>
                  Bersihkan
                </button>
              )}
            </div>

            <div className="format-pill-row">
              <span className="chip chip-format">{currentMode.from}</span>
              <span aria-hidden="true">——→</span>
              <span className="chip chip-format">{currentMode.to}</span>
            </div>
          </div>
        </div>
      </Hero>

      <Steps />

      <LibreOfficeGuide />

      {serverMode === "landing" && (
        <div className="info-section">
          <div>
            <span className="eyebrow">INFO</span>
            <h2>Backend belum aktif.</h2>
          </div>
          <p>
            Konversin <strong>butuh backend</strong> untuk memproses konversi (LibreOffice, Pandoc, Tesseract berjalan di
            server). Deploy folder <code>konversin-backend</code> ke Render, lalu set env{" "}
            <code>VITE_API_URL</code> di Vercel ke URL backend tersebut dan redeploy frontend.
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}
