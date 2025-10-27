/*
  # Create Chat History Tables for LearningisLife AI

  1. New Tables
    - `chat_sessions`
      - `id` (uuid, primary key) - Unique session identifier
      - `department` (text) - Department/subject of the chat session
      - `created_at` (timestamptz) - When the session was created
      - `updated_at` (timestamptz) - Last activity timestamp
    
    - `chat_messages`
      - `id` (uuid, primary key) - Unique message identifier
      - `session_id` (uuid, foreign key) - References chat_sessions
      - `content` (text) - Message content
      - `role` (text) - Either 'user' or 'assistant'
      - `created_at` (timestamptz) - When the message was sent

  2. Security
    - Enable RLS on both tables
    - Public read access for educational content
    - No authentication required for this educational chatbot
*/

CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  content text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view chat sessions"
  ON chat_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create chat sessions"
  ON chat_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view chat messages"
  ON chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_department ON chat_sessions(department);
