import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import PointCloudModel from './PointCloudModel'
import ScaleGrid from './ScaleGrid'

// ── Model registry ──────────────────────────────────────────────
// Add new models here. Each entry needs:
//   id:        unique key
//   label:     display name shown as subtitle & in toggle buttons
//   url:       path to the file in /public
//   component: the React component that renders it
// ─────────────────────────────────────────────────────────────────
const MODELS = [
  {
    id: 'pointcloud',
    label: 'Point Cloud',
    url: `${import.meta.env.BASE_URL}models/260227-Rivermeet-Pointcloud_262k_cleaned.glb`,
    component: PointCloudModel,
  },
  // Future examples:
  // { id: 'mesh',    label: 'Mesh',            url: '/models/mesh.glb',    component: MeshModel },
  // { id: 'splat',   label: 'Gaussian Splat',  url: '/models/splat.ply',   component: SplatModel },
]

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeModelId, setActiveModelId] = useState(MODELS[0].id)
  const [infoOpen, setInfoOpen] = useState(false)
  const [scaleInfo, setScaleInfo] = useState(null)

  const activeModel = MODELS.find((m) => m.id === activeModelId)

  const bgColor = darkMode ? '#1a1a2e' : '#e8eaef'
  const buttonBg = darkMode ? '#ffffff' : '#1a1a2e'
  const buttonText = darkMode ? '#1a1a2e' : '#ffffff'

  return (
    <div style={{ width: '100%', height: '100%', background: bgColor }}>
      {/* Toggle button */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '8px',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            background: buttonBg,
            color: buttonText,
            fontSize: 18,
            lineHeight: 1,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {darkMode ? (
              /* Sun */
              <>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </>
            ) : (
              /* Moon */
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            )}
          </svg>
        </button>
      </div>

      {/* Hamburger menu (top-right) */}
      <button
        onClick={() => setInfoOpen(true)}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 10,
          background: 'none',
          border: 'none',
          color: darkMode ? '#ccc' : '#333',
          fontSize: 26,
          cursor: 'pointer',
          padding: 8,
          lineHeight: 1,
        }}
      >
        ☰
      </button>

      {/* Info overlay */}
      {infoOpen && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setInfoOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: darkMode ? '#1e1e30' : '#ffffff',
              color: darkMode ? '#d0d0d0' : '#333',
              borderRadius: 16,
              padding: 32,
              maxWidth: 520,
              width: '90%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setInfoOpen(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: 'none',
                border: 'none',
                color: darkMode ? '#888' : '#999',
                fontSize: 22,
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            <img
              src="https://martinedstrom.com/wp-content/uploads/2020/01/MartinEdstrom-KY-MAVIC2PRO-200416-0918-00001412-1536x1024.jpg"
              alt="Aerial view of the Tian Shan mountains, Kyrgyzstan"
              style={{
                width: '100%',
                borderRadius: 10,
                marginBottom: 20,
                objectFit: 'cover',
              }}
            />

            <h2 style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
              color: darkMode ? '#f0f0f0' : '#111',
            }}>
              About This Data
            </h2>

            <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              marginBottom: 16,
            }}>
              The 3D environment you are exploring here is the direct result of the{' '}
              <a
                href="https://martinedstrom.com/projects/uncharted-caves-of-kyrgyzstan/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: darkMode ? '#7eb8ff' : '#2563eb', textDecoration: 'underline' }}
              >
                Uncharted Caves of Kyrgyzstan
              </a>{' '}
              project. To map and preserve one of Earth's most remote mountain ranges,
              a multidisciplinary team of scientists and storytellers utilized extensive
              drone flights and photogrammetry to capture the rugged Tian Shan mountains
              in high resolution. During the expedition, these exact 3D models allowed
              the team to efficiently scout the complex terrain in real-time and discover
              previously unrecorded cave systems. Today, the data you are interacting
              with serves a greater purpose: acting as a vital tool for scientific
              analysis, immersive storytelling, and ongoing conservation efforts to
              establish a protected geopark in the pristine Kok-Kiya region.
            </p>

            <a
              href="https://martinedstrom.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontSize: 13,
                fontWeight: 600,
                color: darkMode ? '#7eb8ff' : '#2563eb',
                textDecoration: 'none',
                borderBottom: `1px solid ${darkMode ? '#7eb8ff44' : '#2563eb44'}`,
                paddingBottom: 1,
              }}
            >
              martinedstrom.com ↗
            </a>
          </div>
        </div>
      )}

      {/* Title + dynamic subtitle (lower-left) */}
      <div className="info-title" style={{
        position: 'absolute',
        bottom: 28,
        left: 28,
        zIndex: 10,
        userSelect: 'none',
      }}>
        <div style={{
          color: darkMode ? '#e0e0e0' : '#222',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: 1.3,
        }}>
          Kyrgyzstan: Axay Uru Valley
        </div>
        <div style={{
          color: darkMode ? '#888' : '#666',
          fontSize: 13,
          fontWeight: 400,
          marginTop: 2,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          {activeModel.label}
        </div>
      </div>

      {/* Navigation hint (bottom-right on desktop, below title on mobile) */}
      <div className="info-hint" style={{
        position: 'absolute',
        zIndex: 10,
        color: darkMode ? '#555' : '#aaa',
        fontSize: 12,
        userSelect: 'none',
        lineHeight: 1.6,
      }}>
        <span className="hint-desktop">Scroll to zoom · Drag to orbit · Right-click drag to pan</span>
        <span className="hint-mobile">Pinch to zoom · Drag to orbit · Two-finger drag to pan</span>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0.5, 1, 1], fov: 50, near: 0.01, far: 1000 }}
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={[bgColor]} />

        {/* Lighting */}
        <ambientLight intensity={darkMode ? 0.6 : 1.0} />
        <directionalLight position={[5, 10, 5]} intensity={darkMode ? 0.8 : 1.0} />

        {/* Active model */}
        <activeModel.component url={activeModel.url} onScaleInfo={setScaleInfo} />

        {/* 1km scale grid */}
        {scaleInfo && <ScaleGrid metersPerUnit={scaleInfo.metersPerUnit} darkMode={darkMode} />}

        {/* Orbit controls with auto-rotate */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.8}
          enableDamping
          dampingFactor={0.05}
          minDistance={0.5}
          maxDistance={6}
        />
      </Canvas>
    </div>
  )
}
