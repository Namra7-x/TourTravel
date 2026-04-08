import { create } from 'zustand';

const useTourStore = create((set) => ({
    bookedTour: [],

    addTour: (tour) => set((state) => ({

        bookedTour: state.bookedTour.find(t => t.id === tour.id) 
            ? state.bookedTour 
            : [...state.bookedTour, tour]
    })),


    removeTour: (tourId) => set((state) => ({
        bookedTour: state.bookedTour.filter((t) => t.id !== tourId)
    })),

    clearBookings: () => set({ bookedTour: [] })
}))

export default useTourStore;