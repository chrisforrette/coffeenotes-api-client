import { stringify } from 'querystring'
import curry from 'curry'
import 'fetch-everywhere'

const { NODE_ENV } = process.env

let API_URL = NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.coffeenot.es'
let AUTH_TOKEN

export const getApiURL = () => API_URL

export const setApiURL = url => {
  API_URL = url
  return API_URL
}

export const getToken = () => AUTH_TOKEN

export const setToken = newToken => {
  AUTH_TOKEN = newToken
  return AUTH_TOKEN
}

const defaultOptions = {
  headers: {},
  method: 'GET'
}

export const getRequestOptions = (config = {}, parameters = {}) => {
  const requestOptions = {
    ...defaultOptions,
    ...config
  }

  if (AUTH_TOKEN) {
    requestOptions.headers['Authorization'] = `Bearer ${AUTH_TOKEN}`
  }

  if (requestOptions.method === 'POST') {
    requestOptions.headers['Content-Type'] = 'application/json'
    requestOptions.body = JSON.stringify(parameters)
  }

  return requestOptions
}

export const handleResponse = async response => {
  if (response.ok) {
    return response.json()
  }

  const error = new Error(`${response.status} ${response.statusText}`)
  error.response = response
  throw error
}

export const request = (config = {}) => {
  return curry(async (endpoint, parameters) => {
    parameters = parameters || {}

    const url = `${API_URL}/${endpoint}`
    const requestOptions = getRequestOptions(config, parameters)
    const querystringParams = requestOptions.method === 'GET' ? parameters : null

    const qs = stringify(querystringParams)

    const response = await global.fetch(
      `${url}${qs ? `?${qs}` : ''}`,
      requestOptions
    )

    return handleResponse(response)
  })
}

export const get = request({ method: 'GET' })
export const create = request({ method: 'POST' })
export const update = request({ method: 'PUT' })

/**
 * Logs API
 * @type {Object}
 */
export const logs = {
  list: get('logs'),
  create: create('logs')
}

/**
 * Users API
 * @type {Object}
 */
export const users = {
  register: create('users/register'),
  login: create('users/token'),
  loginFacebook: create('users/token/facebook')
}

/**
 * Drinks API
 * @type {Object}
 */
export const drinks = {
  list: get('drinks')
}

/**
 * Beans API
 * @type {Object}
 */
export const beans = {
  list: get('beans')
}
