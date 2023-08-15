import { Autocomplete, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import getAxios from '../../utils/getAxios'
import { CustomSessionType } from '../../../types/CustomSessionType'
import { useSession } from 'next-auth/react'
import CountryType from '../../../types/CountryType'
import styles from "../../../styles/Profile.module.css"
import LanguageType from '../../../types/LanguageType'

function ProfileCreateTab1() {
  const { data: session } = useSession()
  const axios = getAxios(session as unknown as CustomSessionType | null)
  const [countries, setCountries] = useState<CountryType[]>([])
  const [languages, setLanguages] = useState<LanguageType[]>([])
  useEffect(() => {
    getCountries()
    getLanguages()
  }, [])

  const getCountries = async () => {
    try {
      const res = await axios.get("accounts/nationalities")
      setCountries(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const getLanguages = async () => {
    try {
      const res = await axios.get("accounts/languages")
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div className={styles.tabContainer}>
      <TextField label="Name" variant="standard"sx={{ width: 300 }} />
      <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={languages}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Your Native Language"
          variant="standard"
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={languages}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Language to learn"
          variant="standard"
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
      <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country"
          variant="standard"
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
    </div>
  )
}

export default ProfileCreateTab1