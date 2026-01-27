function validateNickname(nickname: string) {
  const errors = {
    nickname: '',
  }

  if (!(nickname.length >= 2 && nickname.length <= 10)) {
    errors.nickname = '2~10자 이내의 닉네임을 입력해주세요'
    return errors
  }

  if (!/^[가-힣a-zA-Z0-9]+$/.test(nickname)) {
    errors.nickname = '공백/특수문자/이모지는 사용할 수 없어요'
    return errors
  }

  return errors
}

export { validateNickname }
