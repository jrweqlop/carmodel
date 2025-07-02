import MainPage from "@/src/components/page/MainPage"
import { UserButton } from "@clerk/nextjs"

const Page = () => {

  return (
    <>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 0.5rem',
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #eee'
      }}>
        {/* Left side: Title */}
        <div>
          <h1 style={{ margin: 0, fontSize: '1rem', color: '#333' }}>
            ECU=Shop model car
          </h1>
        </div>

        {/* Right side: Avatar */}
        <div>
          <UserButton />
        </div>
      </nav>
      <MainPage />

    </>
  )
}

export default Page
