import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Message } from '@/types/booking';

export const sendMessageToClaude = createAsyncThunk<
  { assistantMessage: Message },
  { userMessage: Message },
  { state: RootState }
>(
  'chat/sendMessageToClaude',
  async ({ userMessage }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const existingMessages = state.chat.messages;

      // Combine conversation with new user message
      const conversation = [...existingMessages, userMessage];

      const selectedCar = state.user.selectedCarId 
        ? // (In a real app, you'd retrieve car data from somewhere, e.g. CarGrid or a DB)
          {
            id: 1,
            name: 'MG 4 Electric',
            type: 'Electric',
            price: 600,
            features: {
              range: '300',
              charging: 'Fast charging',
              acceleration: '0-60 in 3.1s'
            }
          }
        : undefined;

      const currentBookingStep = state.booking.stepName; 

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: conversation,
          selectedCar,
          currentBookingStep
        })
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message ?? '',
        timestamp: new Date(),
        reactions: [],
        attachments: []
      };

      return { assistantMessage };
    } catch (error: any) {
      return rejectWithValue(error.message ?? 'Unknown error occurred');
    }
  }
);

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      state.messages = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToClaude.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageToClaude.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload.assistantMessage);
      })
      .addCase(sendMessageToClaude.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { addMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;

// Selectors
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectLoading = (state: RootState) => state.chat.loading;
export const selectError = (state: RootState) => state.chat.error;
