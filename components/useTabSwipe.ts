import { useRouter } from "expo-router";
import { useState } from "react";

export function useTabSwipe(currentTab: "library" | "explore" | "profile") {
  const router = useRouter();
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const onTouchStart = (e: any) => {
    setTouchStart({
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    });
  };

  const onTouchEnd = (e: any) => {
    const dx = e.nativeEvent.pageX - touchStart.x;
    const dy = e.nativeEvent.pageY - touchStart.y;

    // Swipe threshold: horizontal movement > 100px, vertical movement < 60px
    if (Math.abs(dx) > 100 && Math.abs(dy) < 60) {
      if (dx < 0) {
        // Swiped left (dragged finger left) -> go right
        if (currentTab === "library") {
          router.replace("/(tabs)/explore");
        } else if (currentTab === "explore") {
          router.replace("/(tabs)/profile");
        }
      } else {
        // Swiped right (dragged finger right) -> go left
        if (currentTab === "explore") {
          router.replace("/(tabs)/library");
        } else if (currentTab === "profile") {
          router.replace("/(tabs)/explore");
        }
      }
    }
  };

  return { onTouchStart, onTouchEnd };
}
