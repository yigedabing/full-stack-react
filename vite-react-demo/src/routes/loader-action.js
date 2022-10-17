import {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../contacts'
import { redirect } from 'react-router-dom'

export async function rootAction(props) {
  console.log('root action create contact then to edit ', props)
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export async function rootLoader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)
  console.log('root loader', contacts)
  return { contacts, q }
}

export async function contactLoader({ params, request }) {
  console.log(`contact loader`, params, request)
  const contact = await getContact(params.contactId)
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'contact page Not Found',
    })
  }
  return contact
}

export async function contactAction({ request, params }) {
  console.log(`contact action`, params, request)
  let formData = await request.formData()
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  })
}

export async function editAction({ request, params }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await updateContact(params.contactId, updates)
  return redirect(`/contacts/${params.contactId}`)
}

export async function destroyAction({ params }) {
  // throw new Error('oh dang!')
  await deleteContact(params.contactId)
  return redirect('/')
}
