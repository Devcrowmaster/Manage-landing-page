import './components/menu';
import Glide from '@glidejs/glide'

const glide = new Glide('.glide', {
  type: 'carousel',
  perView: 2.5,
  focusAt: 'center',
  gap: 20,
  autoplay: 5000,
  breakpoints: {
    800: {
      perView: 2
    },
    480: {
      perView: 1
    }
  }
})

glide.mount()
