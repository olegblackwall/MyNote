import axios from 'axios'
import { ref, watch } from 'vue'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

// Токен пользователя
const user_token = ref<string>(cookies.get('accessToken') || '')

// Создаем базовый экземпляр Axios
const baseURL = axios.create({
    baseURL: 'https://dist.nd.ru',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user_token.value}`
    },
})

// Устанавливаем токен в заголовок сразу при загрузке
if (user_token.value) {
    baseURL.defaults.headers.common['Authorization'] = `Bearer ${user_token.value}`
}

// Интерцептор для установки токена перед каждым запросом
baseURL.interceptors.request.use(config => {
        if (user_token.value) {
            config.headers['Authorization'] = `Bearer ${user_token.value}`
        }
        return config
    }, error => {
        return Promise.reject(error)
})

// Устанавливаем токен в заголовок при изменении значения `user_token`
watch(() => user_token.value, (newToken) => {
    baseURL.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
})

// Интерсептор для обработки ошибок
baseURL.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const formatted_error = formatErrorResponse(error.response)
            console.error(formatted_error)
            return Promise.reject(new Error(formatted_error.message))
        } else {
            const unknown_error = {
                message: "Неизвестная ошибка, невозможно получить данные",
                statusCode: 500,
                error: "Internal Server Error",
            }
            console.error(unknown_error)
            return Promise.reject(new Error(unknown_error.message))
        }
    }
)

// Универсальная функция для форматирования ошибок
const formatErrorResponse = (response: any) => {
    const message = Array.isArray(response.data.message) && response.data.message.length === 1
        ? response.data.message[0]
        : Array.isArray(response.data.message)
            ? response.data.message.join('. ')
            : response.data.message

    return {
        message: Array.isArray(message) ? JSON.stringify(message) : message,
        error: response.data.error,
        statusCode: response.data.statusCode,
    }
}

// Проверка статуса сервера
export const checkServerStatus = () => {
    return baseURL.head('/api/ping')
}

// Регистрация нового пользователя
export const registerUser = async (user_data: { email: string, password: string, confirm_password: string }) => {
    const response = await baseURL.post('/api/reg', user_data)
    return response.data
}

// Авторизация пользователя
export const authUser = async (user_data: { email: string, password: string }) => {
    const response = await baseURL.post('/api/auth', user_data)
    cookies.set('accessToken', response.data.accessToken, '7d')
    user_token.value = response.data.accessToken
        // Обновляем заголовок Authorization
    baseURL.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
    return response.data
}

// Получение информации о пользователе
export const getUserInfo = async () => {
    const response = await baseURL.get('/api/auth')
    return response.data
}

// Выход пользователя
export const logoutUser = async () => {
    const response = await baseURL.delete('/api/auth')
    cookies.remove('accessToken')
    user_token.value = ''
    return response.data
}

// Функция для создания заметки
export const createNote = async (title: string, content: string) => {
    const response = await baseURL.post('/api/notes', { title, content })
    return response.data
}


// Функция для получения списка заметок
export const getNotes = async () => {
        const response = await baseURL.get('/api/notes')
        return response.data
}

// Функция для удаления заметки
export const deleteNote = async (id: number) => {
        const response = await baseURL.delete(`/api/notes/${id}`)
        return response.data
}