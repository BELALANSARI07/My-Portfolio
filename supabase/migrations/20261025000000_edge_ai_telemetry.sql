-- ==============================================================================
-- MIGRATION: 20261025000000_edge_ai_telemetry.sql
-- FEATURE: Low-Latency Edge AI Alert System Telemetry & Specs
-- Target: Supabase (PostgreSQL 16)
-- ==============================================================================

-- 1. ADD COLUMNS TO PROJECTS FOR REAL-TIME TELEMETRY & SPECIFICATIONS
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS latency_ms NUMERIC(5, 2) DEFAULT 14.5,
ADD COLUMN IF NOT EXISTS accuracy_pct NUMERIC(5, 2) DEFAULT 84.6,
ADD COLUMN IF NOT EXISTS power_draw_w NUMERIC(4, 2) DEFAULT 7.5,
ADD COLUMN IF NOT EXISTS alert_thresholds JSONB DEFAULT '{
    "confidence": 0.85,
    "iou": 0.45,
    "cooldown_s": 2,
    "audio_alarm": true,
    "gpio_pin": 18
}'::jsonb,
ADD COLUMN IF NOT EXISTS edge_specs JSONB DEFAULT '{
    "target_hardware": "NVIDIA Jetson Nano / Raspberry Pi 4 (8GB) with Camera Module V2",
    "core_stack": ["PyTorch", "YOLOv8 (nano/small)", "OpenCV", "ONNX Runtime (CPU/EdgeGPU optimized)", "Mosquitto (MQTT)", "FastAPI"],
    "inference_latency": "12ms to 18ms on-device using TensorRT/ONNX optimizations",
    "alert_response": "< 50ms total latency from frame capture to MQTT-triggered IO/alert"
}'::jsonb,
ADD COLUMN IF NOT EXISTS mock_logs JSONB DEFAULT '[
    "[02:14:02] Camera-01 stream initialized.",
    "[02:14:03] ONNX runtime loading FP16 model quantized on-edge.",
    "[02:14:04] INFERENCE ACTIVE: fps_avg=45.2, latency_avg=14.2ms.",
    "[02:14:15] ALERT: Pedestrian detected (conf=0.91) in region A-2. Triggering Edge GPIO...",
    "[02:14:15] MQTT message published to ''alert/system/01''."
]'::jsonb,
ADD COLUMN IF NOT EXISTS mock_stream_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS mock_detections JSONB DEFAULT '[
    {"label": "PERSON", "confidence": 0.91, "box": [120, 80, 180, 320], "region": "A-2"},
    {"label": "VEHICLE", "confidence": 0.88, "box": [340, 140, 480, 360], "region": "LANE-1"}
]'::jsonb;

-- 2. ENSURE RLS POLICIES FOR PROJECTS ALLOW PUBLIC READ AND ADMIN WRITE
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Public projects read" ON public.projects;
    DROP POLICY IF EXISTS "Admin projects all" ON public.projects;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

CREATE POLICY "Public projects read" 
ON public.projects FOR SELECT 
USING (true);

CREATE POLICY "Admin projects all" 
ON public.projects FOR ALL 
USING (
    (auth.jwt() ->> 'email') = 'belalansari000078@gmail.com'
)
WITH CHECK (
    (auth.jwt() ->> 'email') = 'belalansari000078@gmail.com'
);

-- 3. UPSERT PROJECT: 02 // LOW-LATENCY EDGE AI ALERT SYSTEM
INSERT INTO public.projects (
    slug,
    title,
    tagline,
    architecture_summary,
    architecture_diagram,
    stack,
    metrics,
    repo_url,
    live_url,
    paper_url,
    model_weights_url,
    status,
    featured,
    display_order,
    latency_ms,
    accuracy_pct,
    power_draw_w,
    alert_thresholds,
    edge_specs,
    mock_logs,
    mock_stream_active,
    mock_detections
) VALUES (
    'low-latency-edge-ai-alert-system',
    'PROJECT: 02 // LOW-LATENCY EDGE AI ALERT SYSTEM',
    'Edge-Deployed Computer Vision System for High-Speed Object Detection & Local Real-Time Alert Triggering.',
    'Developing a pipeline to process real-time video streams on edge devices (like Raspberry Pi, Jetson Nano, or local hardware) using lightweight YOLO architectures, running below 15ms per frame to trigger alerts without cloud-dependency.',
    '+--------------------+      +--------------------+      +----------------------+
| VIDEO FEED (60FPS) | ---> | ON-DEVICE RESIZING | ---> | YOLOv8-NANO INFER    |
| (CSI-2 / RTSP)     |      | (V4L2 / OpenCV)    |      | (ONNX FP16 / TensorRT|
+--------------------+      +--------------------+      +----------+-----------+
                                                                   |
                                                                   v
+--------------------+      +--------------------+      +----------------------+
| USER HUBS & SIRENS | <--- | MQTT ALERTS TRIG   | <--- | POST-PROCESSING      |
| (< 50ms Relay)     |      | (Mosquitto QoS 1)  |      | (NMS & Conf Thresh)  |
+--------------------+      +--------------------+      +----------------------+',
    ARRAY['PyTorch', 'YOLOv8', 'OpenCV', 'ONNX Runtime', 'Mosquitto (MQTT)', 'FastAPI', 'TensorRT'],
    '[
        {"label": "Precision", "value": "84.6% mAP@0.5", "delta": "FP16 Optimized"},
        {"label": "Latency", "value": "14.5ms", "delta": "Inference on Edge"},
        {"label": "Power Draw", "value": "~7.5W", "delta": "Peak Edge Operation"}
    ]'::jsonb,
    'https://github.com/BELALANSARI07/-Low-Latency-Edge-AI-Alert-System.',
    null,
    null,
    null,
    'PRODUCTION',
    true,
    2,
    14.50,
    84.60,
    7.50,
    '{
        "confidence": 0.85,
        "iou": 0.45,
        "cooldown_s": 2,
        "audio_alarm": true,
        "gpio_pin": 18
    }'::jsonb,
    '{
        "target_hardware": "NVIDIA Jetson Nano / Raspberry Pi 4 (8GB) with Camera Module V2",
        "core_stack": ["PyTorch", "YOLOv8 (nano/small)", "OpenCV", "ONNX Runtime (CPU/EdgeGPU optimized)", "Mosquitto (MQTT)", "FastAPI"],
        "inference_latency": "12ms to 18ms on-device using TensorRT/ONNX optimizations",
        "alert_response": "< 50ms total latency from frame capture to MQTT-triggered IO/alert"
    }'::jsonb,
    '[
        "[02:14:02] Camera-01 stream initialized.",
        "[02:14:03] ONNX runtime loading FP16 model quantized on-edge.",
        "[02:14:04] INFERENCE ACTIVE: fps_avg=45.2, latency_avg=14.2ms.",
        "[02:14:15] ALERT: Pedestrian detected (conf=0.91) in region A-2. Triggering Edge GPIO...",
        "[02:14:15] MQTT message published to ''alert/system/01''."
    ]'::jsonb,
    true,
    '[
        {"label": "PERSON", "confidence": 0.91, "box": [120, 80, 180, 320], "region": "A-2"},
        {"label": "VEHICLE", "confidence": 0.88, "box": [340, 140, 480, 360], "region": "LANE-1"}
    ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    tagline = EXCLUDED.tagline,
    architecture_summary = EXCLUDED.architecture_summary,
    architecture_diagram = EXCLUDED.architecture_diagram,
    stack = EXCLUDED.stack,
    metrics = EXCLUDED.metrics,
    repo_url = EXCLUDED.repo_url,
    status = EXCLUDED.status,
    featured = EXCLUDED.featured,
    display_order = EXCLUDED.display_order,
    latency_ms = EXCLUDED.latency_ms,
    accuracy_pct = EXCLUDED.accuracy_pct,
    power_draw_w = EXCLUDED.power_draw_w,
    alert_thresholds = EXCLUDED.alert_thresholds,
    edge_specs = EXCLUDED.edge_specs,
    mock_logs = EXCLUDED.mock_logs,
    mock_stream_active = EXCLUDED.mock_stream_active,
    mock_detections = EXCLUDED.mock_detections,
    updated_at = NOW();
