import { NextResponse } from 'next/server';
import { getSyncedProjects } from '@/lib/github/sync';

export const revalidate = 300; // 5 minutes cache

export async function GET() {
  try {
    const projects = await getSyncedProjects();
    return NextResponse.json({
      success: true,
      count: projects.length,
      synced_at: new Date().toISOString(),
      projects,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to sync projects',
      },
      { status: 500 }
    );
  }
}
