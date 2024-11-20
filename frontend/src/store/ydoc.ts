import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { create } from "zustand";

type YDocStoreState = {
  ydoc?: Y.Doc;
  provider?: WebsocketProvider;
};

type YDocStoreActions = {
  setYDoc: (ydoc?: Y.Doc) => void;
  setProvider: (provider?: WebsocketProvider) => void;
  destroyConnection: () => void;
};

export const useYDocStore = create<YDocStoreState & YDocStoreActions>((set, get) => ({
  ydoc: undefined,
  provider: undefined,

  setYDoc: (ydoc?: Y.Doc) => {
    set({ ydoc });
  },

  setProvider: (provider?: WebsocketProvider) => {
    set({ provider });
  },

  destroyConnection: () => {
    const { provider } = get();

    if (provider) {
      provider.disconnect();
    }

    set({ ydoc: undefined, provider: undefined });
  },
}));
