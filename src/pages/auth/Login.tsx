import { motion, type Variants } from 'framer-motion'
import logo from '@/assets/img/logo.png'
import kakao from '@/assets/logo/kakao.svg'
import LoginMain from '@/assets/img/loginMain.png'
import LoginSub from '@/assets/img/loginSub.png'

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

const subtleFloatVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const subtleScaleVariants: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const subtleRotateVariants: Variants = {
  animate: {
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export default function Login() {
  const KAKAO_AUTH_URL = import.meta.env.VITE_KAKAO_AUTH_URL

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  return (
    <motion.div
      className="relative min-h-screen w-full bg-[#FEFAF6] flex flex-col items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-[#D65151]" />
      <svg
        className="absolute bottom-[10%] left-0 right-0 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ height: '120px' }}
      >
        <path d="M0,0 Q720,120 1440,0 L1440,120 L0,120 Z" fill="#D65151" />
      </svg>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center z-10"
        variants={itemVariants}
      >
        <motion.img
          src={LoginSub}
          alt="서브 이미지"
          className="absolute -top-30 w-[150%] max-w-[600px] mb-8 "
          variants={subtleFloatVariants}
          animate="animate"
        />
        <motion.img
          src={logo}
          alt="서비스 로고"
          className="w-120 mt-15"
          variants={subtleScaleVariants}
          animate="animate"
        />
        <motion.img
          src={LoginMain}
          alt="메인 이미지"
          className="w-100 -mt-5"
          variants={subtleRotateVariants}
          animate="animate"
        />

        <motion.svg
          viewBox="0 0 500 120"
          className="w-full max-w-md -mt-10"
          style={{ overflow: 'visible' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <defs>
            <path id="curve" d="M 50 20 Q 250 170 450 20" fill="transparent" />
          </defs>

          <text fill="#57504F" fontSize="18" fontWeight="600" letterSpacing="3">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              세상에 하나뿐인 케이크, 내 맘대로 휘핑하다
            </textPath>
          </text>
        </motion.svg>
      </motion.div>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleKakaoLogin}
        className="relative z-10 flex w-[80%] max-w-sm h-12.25 items-center justify-center mt-12 pr-[0.01px] bg-[#FEE500] rounded-[12.75px] shadow-md transition-colors gap-8"
      >
        <img src={kakao} alt="카카오 로고" className="w-5 h-5" />
        카카오톡으로 시작하기
      </motion.button>
    </motion.div>
  )
}
