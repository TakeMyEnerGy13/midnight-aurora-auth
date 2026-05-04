import { type FormEvent, useId, useState } from 'react'
import './App.css'

type Theme = 'midnight' | 'linen'
type FieldName = 'email' | 'password'
type Errors = Partial<Record<FieldName, string>>
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(value: string) {
  if (!value.trim()) return 'Enter your email address.'
  if (!EMAIL_RE.test(value)) return 'Enter a valid email address.'
  return ''
}

function validatePassword(value: string) {
  if (!value) return 'Enter your password.'
  if (value.length < 8) return 'Password must be at least 8 characters.'
  return ''
}

function App() {
  const emailId = useId()
  const passwordId = useId()
  const emailErrorId = `${emailId}-error`
  const passwordErrorId = `${passwordId}-error`
  const serverErrorId = 'server-error'

  const [theme, setTheme] = useState<Theme>('midnight')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    email: false,
    password: false,
  })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [serverError, setServerError] = useState('')

  const fieldErrors: Errors = {
    email: touched.email ? validateEmail(email) : '',
    password: touched.password ? validatePassword(password) : '',
  }

  const hasFieldErrors = Boolean(
    fieldErrors.email || fieldErrors.password || validateEmail(email) || validatePassword(password),
  )

  const handleBlur = (field: FieldName) => {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTouched({ email: true, password: true })
    setServerError('')

    const nextErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    }

    if (nextErrors.email || nextErrors.password) return

    setSubmitState('loading')

    await new Promise((resolve) => window.setTimeout(resolve, 1400))

    if (email.toLowerCase().includes('error')) {
      setSubmitState('error')
      setServerError('We could not sign you in. Check your credentials and try again.')
      return
    }

    setSubmitState('success')
  }

  const isSubmitting = submitState === 'loading'
  const isSuccess = submitState === 'success'

  return (
    <div className="app-shell" data-theme={theme}>
      <div className="background-layer" aria-hidden="true">
        <div className="aurora aurora-teal" />
        <div className="aurora aurora-cyan" />
        <div className="aurora aurora-amber" />
        <div className="grain-overlay" />
      </div>

      <main className="auth-page">
        <div className="theme-switcher" role="group" aria-label="Theme switcher">
          <button
            type="button"
            className={theme === 'midnight' ? 'theme-chip is-active' : 'theme-chip'}
            onClick={() => setTheme('midnight')}
          >
            Midnight
          </button>
          <button
            type="button"
            className={theme === 'linen' ? 'theme-chip is-active' : 'theme-chip'}
            onClick={() => setTheme('linen')}
          >
            Linen
          </button>
        </div>

        <div className="brand-mark" aria-hidden="true">
          <span className="brand-dot" />
          <span className="brand-letter">A</span>
        </div>

        <section className="auth-card" aria-labelledby="auth-title">
          <header className="auth-header">
            <p className="eyebrow">Workspace access</p>
            <h1 id="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to continue to your workspace.</p>
          </header>

          {serverError ? (
            <div className="server-banner" id={serverErrorId} role="alert">
              <span className="server-banner-title">Unable to sign in</span>
              <span>{serverError}</span>
            </div>
          ) : null}

          {isSuccess ? (
            <div className="success-panel" role="status" aria-live="polite">
              <span className="success-badge" aria-hidden="true" />
              <div>
                <p className="success-title">You are signed in.</p>
                <p className="success-copy">
                  Session restored for <strong>{email}</strong>
                  {keepSignedIn ? ' and this device will stay trusted.' : '.'}
                </p>
              </div>
            </div>
          ) : null}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="field-label" htmlFor={emailId}>
                Email
              </label>
              <div className="input-shell">
                <input
                  id={emailId}
                  className="auth-input"
                  type="email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={fieldErrors.email ? 'true' : 'false'}
                  aria-describedby={fieldErrors.email ? emailErrorId : undefined}
                  disabled={isSubmitting}
                />
              </div>
              <p className={fieldErrors.email ? 'field-note is-error' : 'field-note'} id={emailErrorId}>
                {fieldErrors.email || 'Use the email tied to your workspace.'}
              </p>
            </div>

            <div className="field">
              <div className="field-row">
                <label className="field-label" htmlFor={passwordId}>
                  Password
                </label>
                <a className="text-link" href="/" onClick={(event) => event.preventDefault()}>
                  Forgot?
                </a>
              </div>
              <div className="input-shell">
                <input
                  id={passwordId}
                  className="auth-input with-toggle"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onBlur={() => handleBlur('password')}
                  aria-invalid={fieldErrors.password ? 'true' : 'false'}
                  aria-describedby={fieldErrors.password ? passwordErrorId : undefined}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                  disabled={isSubmitting}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <p
                className={fieldErrors.password ? 'field-note is-error' : 'field-note'}
                id={passwordErrorId}
              >
                {fieldErrors.password || 'Minimum 8 characters.'}
              </p>
            </div>

            <label className="checkbox-row">
              <input
                className="checkbox-input"
                type="checkbox"
                checked={keepSignedIn}
                onChange={(event) => setKeepSignedIn(event.target.checked)}
                disabled={isSubmitting}
              />
              <span>Keep me signed in</span>
            </label>

            <button
              type="submit"
              className="auth-button"
              disabled={isSubmitting || hasFieldErrors}
              aria-busy={isSubmitting}
            >
              <span className={isSubmitting ? 'button-label is-hidden' : 'button-label'}>
                {submitState === 'error' ? 'Try again' : 'Sign in'}
              </span>
              <span className={isSubmitting ? 'button-spinner is-visible' : 'button-spinner'} aria-hidden="true" />
              <span className="sr-only">{isSubmitting ? 'Signing you in' : 'Submit sign in form'}</span>
            </button>

            <p className="account-copy">
              Don&apos;t have an account?{' '}
              <a className="text-link" href="/" onClick={(event) => event.preventDefault()}>
                Create one
              </a>
            </p>
          </form>
        </section>

        <p className="legal-copy">
          By continuing you agree to the <a href="/">Terms</a> and <a href="/">Privacy Policy</a>.
        </p>
      </main>
    </div>
  )
}

export default App
