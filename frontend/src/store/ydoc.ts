import * as Y from "yjs";
import { create } from "zustand";

type YDocStoreState = {
  ydoc?: Y.Doc;
  provider?: Y.AbstractConnector;
};

type YDocStoreActions = {
  setYDoc: (ydoc?: YDocStoreState["ydoc"]) => void;
  setProvider: (provider?: YDocStoreState["provider"]) => void;
  destroyConnection: () => void;
};

export const useYDocStore = create<YDocStoreState & YDocStoreActions>((set, get) => ({
  ydoc: undefined,
  provider: undefined,

  setYDoc: (ydoc?: Y.Doc) => {
    set({ ydoc });
  },

  setProvider: (provider) => {
    set({ provider });
  },

  destroyConnection: () => {
    const { provider } = get();

    if (provider) {
      provider.destroy();
    }

    set({ ydoc: undefined, provider: undefined });
  },
}));
