import { useEffect } from 'react'
import { NavLink, redirect, useNavigation, useSubmit } from 'react-router-dom'
import { Form } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { getContacts, createContact } from '../contacts'

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

export default function Root() {
  const { contacts, q } = useLoaderData()
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    document.getElementById('q').value = q
  }, [q])

  const searchContact = (event) => {
    const isFirstSearch = q == null
    console.log('search contact', q)
    submit(event.currentTarget.form, { replace: !isFirstSearch })
  }

  return (
    <>
      <div id="sidebar">
        <h1>Learn once, write anywhere.</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              placeholder="Search"
              type="search"
              name="q"
              className={searching ? 'loading' : ''}
              defaultValue={q}
              onChange={(event) => searchContact(event)}
            />
            <div id="search-spinner" hidden={!searching} />
            <div className="sr-only"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  )
}
