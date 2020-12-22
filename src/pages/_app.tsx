import { AppProps } from 'next/app'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
// Context
import Providers from '../contexts/providers'
// CSS
import '../assets/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Component {...pageProps} />
      </MuiPickersUtilsProvider>
    </Providers>
  )
}

export default App
