var token = {
  loadToken: function() {
    const tokenInfo = {}
    tokenInfo.access_token = sessionStorage.getItem('access_token')
    tokenInfo.enabled = sessionStorage.getItem('enabled')
    tokenInfo.expires_in = sessionStorage.getItem('expires_in')
    tokenInfo.refresh_token = sessionStorage.getItem('refresh_token')
    tokenInfo.token_type = sessionStorage.getItem('token_type')
    tokenInfo.employeeId = sessionStorage.getItem('employeeId')
    tokenInfo.employeeName = sessionStorage.getItem('employeeName')
    tokenInfo.contractBody = sessionStorage.getItem('contractBody')
    tokenInfo.gsCode = sessionStorage.getItem('gsCode')
    return tokenInfo
  }
}

export default token
