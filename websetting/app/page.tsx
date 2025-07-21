'use client'
import FromLogin from "@/src/modules/From/FromLogin";
import NotificationProvider from "@/src/provider/NotificationProvider";
import { instance } from "@/src/server/server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const Page = () => {

  const router = useRouter()


  const [error, setError] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false)

  const authApi = async (data: FormData): Promise<TokenApi | null> => {
    const result = await instance.post('auth', data).then((res) => res.data).catch(() => null)
    return result
  }

  const onSubmit = async (data: FormData) => {
    setLoad(true)
    const result: TokenApi | null = await authApi(data)
    const setSession = sessionStorage.setItem('auth_ecu', JSON.stringify(result))
    if (result) {
      router.replace("/home")
    } else {
      enqueueSnackbar('username or password not match', {
        variant: 'error'
      })
      setLoad(false)
    }
  };

  const check = async () => {
    const value = await sessionStorage.getItem('auth_ecu') as string | null
    if (value !== null) {
      const item = JSON.parse(value) as TokenApi
      const result = await instance.get('auth/profile', {
        headers: {
          Authorization: `Bearer ${item.access_token}`
        }
      }).then((res) => res.data).catch(() => null)
      if (result) {
        router.replace("/home")
      } else {
        sessionStorage.removeItem('auth_ecu')
      }
    }
    setLoad(false)
  }

  useEffect(() => {
    check()
  }, [])

  return (
    <>
      <NotificationProvider>
        {/* <body style={{ background: ' #4b4b4b' }}> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 400,
            margin: "0 auto",
            padding: 4,
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            ECU=Shop Carmodel
          </Typography>
          <FromLogin onSubmit={onSubmit} loading={load} />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
        {/* </body> */}
      </NotificationProvider>
    </>
  )
}

export default Page
