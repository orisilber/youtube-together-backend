import express from "express";

interface SocketIO {
  emit: (eventName: EventName, message: string) => void;
}

type AppWithIo = express.Application & { io: SocketIO };
export type RequestWithIo = express.Request & { app: AppWithIo };
export type EventName = "VIDEO_ADDED" | "VIDEO_REMOVED";
