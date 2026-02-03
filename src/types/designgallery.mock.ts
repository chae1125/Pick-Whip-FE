import type { CakeCardItem } from '@/types/designgallery'

type MockResult = {
  all: CakeCardItem[]
  bestPick: CakeCardItem[]
  birthdayBest: CakeCardItem[]
  letteringBest: CakeCardItem[]
}

const mk = (id: number, cakeName: string, price: number, keywords: string[]): CakeCardItem => ({
  id,
  imageUrl: `https://picsum.photos/seed/cake-${id}/400/400`,
  cakeName,
  price,
  keywords,
  isLiked: false,
})

export function mock(): MockResult {
  const all = Array.from({ length: 48 }).map((_, i) =>
    mk(
      1000 + i,
      [
        '크리스마스 파티 케이크',
        '미니 케이크',
        '심플 케이크',
        '티아라 케이크',
        '플라워 케이크',
        '레터링 케이크',
      ][i % 6],
      [50000, 30000, 13000, 60000, 45000, 55000][i % 6],
      [
        ['웨딩', '기념일', '파티'],
        ['미니', '기념일', '파티'],
        ['심플', '기념일'],
        ['웨딩', '기념일'],
        ['플라워', '기념일'],
        ['레터링', '기념일'],
      ][i % 6],
    ),
  )

  const bestPick = Array.from({ length: 24 }).map((_, i) =>
    mk(
      2000 + i,
      ['베스트 픽 1', '베스트 픽 2', '베스트 픽 3'][i % 3],
      [52000, 38000, 29000][i % 3],
      [
        ['BEST', '인기'],
        ['BEST', '추천'],
        ['BEST', '미니'],
      ][i % 3],
    ),
  )

  const birthdayBest = Array.from({ length: 24 }).map((_, i) =>
    mk(
      3000 + i,
      ['생일 케이크 A', '생일 케이크 B', '생일 케이크 C'][i % 3],
      [55000, 45000, 35000][i % 3],
      [
        ['생일', '기념일'],
        ['생일', '파티'],
        ['생일', '심플'],
      ][i % 3],
    ),
  )

  const letteringBest = Array.from({ length: 24 }).map((_, i) =>
    mk(
      4000 + i,
      ['레터링 케이크 A', '레터링 케이크 B', '레터링 케이크 C'][i % 3],
      [60000, 50000, 42000][i % 3],
      [
        ['레터링', '기념일'],
        ['레터링', '파티'],
        ['레터링', '심플'],
      ][i % 3],
    ),
  )

  return { all, bestPick, birthdayBest, letteringBest }
}
