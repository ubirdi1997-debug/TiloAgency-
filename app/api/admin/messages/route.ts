import { NextRequest, NextResponse } from 'next/server';
import { getDB, Message } from '@/lib/db';

// GET - Fetch all messages
export async function GET() {
  try {
    const db = await getDB();
    const messages = db.data.messages.sort((a: Message, b: Message) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a message
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const db = await getDB();
    const index = db.data.messages.findIndex((m: Message) => m.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    db.data.messages.splice(index, 1);
    await db.write();

    return NextResponse.json(
      { success: true, message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to delete message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}

// PATCH - Update message (mark as read)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const db = await getDB();
    const message = db.data.messages.find((m: Message) => m.id === id);

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    message.read = read;
    await db.write();

    return NextResponse.json(
      { success: true, message: 'Message updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to update message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}
