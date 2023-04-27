class TestService {
  async createTest(title: string) {
    const test = await prisma.test.create({
      data: {
        title,
        dd: 'dd',
      },
    })
    return test
  }
}

export const testService = new TestService()
