import Animated from 'react-native-reanimated';
import { 
  FadeIn, 
  FadeOut, 
  SlideInUp, 
  SlideInDown, 
  ZoomIn, 
  Layout,
  Easing 
} from 'react-native-reanimated';

// Reusable animation helpers
export const fadeInFast = FadeIn.duration(220).easing(Easing.out(Easing.quad));
export const fadeOutFast = FadeOut.duration(160);
export const slideInUp = SlideInUp.duration(280).easing(Easing.out(Easing.cubic));
export const slideInDown = SlideInDown.duration(280).easing(Easing.out(Easing.cubic));
export const zoomInSoft = ZoomIn.duration(260).easing(Easing.out(Easing.quad));
export const springLayout = Layout.springify().stiffness(140).damping(18).mass(0.9);

// Export Animated.View as AView
export const AView = Animated.View;