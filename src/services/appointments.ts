const API_BASE_URL = import.meta.env.VITE_API_URL

export interface CreateAppointmentPayload {
  name: string
  email: string
  date: string
  time: string
}

export async function createAppointment(
  payload: CreateAppointmentPayload
) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      version: 'v1',
      action: 'createAppointment',
      data: payload
    })
  })

  if (!response.ok) {
    let message = 'Erro ao criar agendamento'

    try {
      const errorBody = await response.json()
      message = errorBody?.message ?? message
    } catch {
      console.error('[createAppointment] Invalid JSON error response')
    }

    throw new Error(message)
  }

  return response.json()
}
