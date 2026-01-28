import { motion, type Variants } from 'framer-motion'
import logo from '@/assets/logo/logo2.svg'
import kakao from '@/assets/logo/kakao.svg'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function Login() {
  return (
    <motion.div
      className="min-h-screen w-full bg-[linear-gradient(0deg,#F7E6E6_-3.26%,rgba(251,156,174,0.8)_111.22%)] flex flex-col items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col items-center justify-center" variants={itemVariants}>
        <img src={logo} alt="서비스 로고" className="w-50 mb-8" />
        <h3 className="text-[16px] font-medium mb-2">Pick & Whip</h3>
        <p className="text-review-owner-title text-sm">
          세상에 하나뿐인 케이크, 내 맘대로 휘핑하다
        </p>
      </motion.div>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex w-full max-w-sm h-12.25 items-center justify-center mt-12 pr-[0.01px] bg-[#FEE500] rounded-[12.75px] shadow-md transition-colors gap-8"
      >
        <img src={kakao} alt="카카오 로고" className="w-5 h-5" />
        카카오톡으로 시작하기
      </motion.button>
    </motion.div>
  )
}
