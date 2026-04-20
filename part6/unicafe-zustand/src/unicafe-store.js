import { create } from 'zustand'

const useCafeStore = create((set) => ({
  reviews: {
    good: 0,
    neutral: 0,
    bad: 0,
  },
  actions: {
    incrementGood: () =>
      set((state) => ({
        reviews: { ...state.reviews, good: state.reviews.good + 1 },
      })),
    incrementNeutral: () =>
      set((state) => ({
        reviews: {
          ...state.reviews,
          neutral: state.reviews.neutral + 1,
        },
      })),
    incrementBad: () =>
      set((state) => ({
        reviews: { ...state.reviews, bad: state.reviews.bad + 1 },
      })),
  },
}))

export const useReviews = () => useCafeStore((state) => state.reviews)
export const useActions = () => useCafeStore((state) => state.actions)
