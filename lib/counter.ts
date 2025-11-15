import { prisma } from "./prisma";

/**
 * Get the next sequence number for a given counter key
 * This mimics Mongoose's auto-increment functionality
 */
export async function getNextSequence(key: string): Promise<number> {
  const counter = await prisma.counter.upsert({
    where: { key },
    update: {
      seq: {
        increment: 1,
      },
    },
    create: {
      key,
      seq: 1,
    },
  });

  return counter.seq;
}

/**
 * Generate a formatted certificate ID based on sequence number
 * Format: YEAR-INT-XXX (e.g., 2025-INT-001)
 */
export function generateCertificateId(sequenceNumber: number): string {
  const year = new Date().getFullYear();
  const paddedNumber = String(sequenceNumber).padStart(3, "0");
  return `${year}-INT-${paddedNumber}`;
}


