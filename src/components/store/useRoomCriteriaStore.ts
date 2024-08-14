import { create } from 'zustand';

type RoomCriteria = {
    adult: number;
    childAges: number[];
    childCount:number;
    night:number;
    setNight:(newNight:number)=>void;
    incrementAdult: () => void;
    decrementAdult: () => void;
    incrementChild:() => void;
    decrementChild:() =>void;
    addChildAge: (age: number) => void;
    removeChildAge: (index: number) => void;
    updateChildAge: (index: number, age: number) => void; 
    setChildAge: (index: number, age: number) => void; // New method
    removeLastChildAge:()=>void;
};

const useRoomStore = create<RoomCriteria>((set) => ({
    adult: 2, // Initial value or any oth   er default value;
    childCount:0,
    childAges: [],
    night:0,
    setNight: (newNight: number) => set({ night: newNight }),
    incrementAdult: () => set((state) => ({
        adult: Math.min(state.adult + 1,10)//Max 10 adult
    })),
    decrementAdult: () => set((state) => ({
        adult: Math.max(state.adult - 1, 1) // Ensure at least 1 adult
    })),
    incrementChild: () => set((state) => ({
        childCount: Math.min(state.childCount + 1,4)//Max 4 child
    })),
    decrementChild: () => set((state) => ({
        childCount: Math.max(state.childCount - 1, 0) //Min 0 child
    })),
    addChildAge: (age: number) => set((state) => ({
        childAges: [...state.childAges, age]
    })),
    removeChildAge: (index: number) => set((state) => ({
        childAges: state.childAges.filter((_, i) => i !== index)
    })),
    updateChildAge: (index: number, age: number) => set((state) => ({
        childAges: state.childAges.map((currentAge, i) =>
            i === index ? age : currentAge
        )
    })),
    setChildAge: (index: number, age: number) => set((state) => {
        const newChildAges = [...state.childAges];
        if (index < newChildAges.length) {
            // Update if the index exists
            newChildAges[index] = age;
        } else {
            // Add if the index does not exist
            while (newChildAges.length <= index) {
                newChildAges.push(0); // Fill with default age (e.g., 0)
            }
            newChildAges[index] = age;
        }
        return { childAges: newChildAges };
    }),
    removeLastChildAge: () => set((state) => ({
        childAges: state.childAges.slice(0, -1) // Remove the last element
    }))
}));

export default useRoomStore;