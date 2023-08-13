import { Autocomplete, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import getAxios from '../../utils/getAxios'
import { CustomSessionType } from '../../../types/CustomSessionType'
import { useSession } from 'next-auth/react'
import CountryType from '../../../types/CountryType'

function ProfileCreateTab1() {
  const { data: session } = useSession()
  const axios = getAxios(session as unknown as CustomSessionType | null)
  const [countries, setCountries] = useState<CountryType[]>([])
  useEffect(() => {
    getCountries()
  }, [])

  const getCountries = async () => {
    try {
      const res = await axios.get("countires")
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div>
      <TextField label="Name" variant="standard" />
      <TextField label="Age" variant="standard" />
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
          label="Choose a country"
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