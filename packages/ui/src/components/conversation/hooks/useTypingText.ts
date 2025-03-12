type TextSubscriber = (text: string) => void;

// Create a singleton state to persist across remounts
export const TypewriterState = {
  currentText: '',
  position: 0,
  subscribers: new Set<TextSubscriber>(),

  updateText(newText: string): void {
    this.currentText = newText;
    this.position = newText.length;
    this.notifySubscribers();
  },

  addSubscriber(callback: TextSubscriber): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  },

  notifySubscribers(): void {
    for (const callback of this.subscribers) {
      callback(this.currentText);
    }
  },

  reset(): void {
    this.currentText = '';
    this.position = 0;
    this.notifySubscribers();
  },
};
