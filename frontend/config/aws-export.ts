const awsExports = {
  Auth: {
      region: 'us-east-1',
      mandatorySignIn: true,
      authenticationFlowType: 'USER_SRP_AUTH',
      userPoolId: 'us-east-1_NoMUvfiX4',
      userPoolWebClientId: '7ubsqgkk3pu9ro3nv857pe5lcb',
      cookieStorage: {
          domain: 'localhost',
          path: '/',
          expires: 365,
          sameSite: 'strict',
          secure: true
      },
      identityPoolId: 'us-east-1:f8ee9e61-bff8-4675-a3da-ad866aaf642d',
  },
  Storage: {
      AWSS3: {
          bucket: 'bennyhawk-transcoder',
          region: 'us-east-1',
          isObjectLockEnabled: false
      }
  }
}

export default awsExports;
