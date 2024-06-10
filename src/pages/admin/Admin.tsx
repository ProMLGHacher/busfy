import { useState } from "react"
import { $api } from "../../shared/api/api"
import { isAxiosError } from "axios"
import { Button } from "../../shared/ui/button/Button"
import { Input } from "../../shared/ui/input/Input"

const Admin = () => {

    const [name, setName] = useState('')

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            $api.post('/api/content-category', {name: name})
            setName('')
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                alert(error.response?.data)
            }
        }
    }

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '10px'
    }}>
        <h1>Admin</h1>
        <h2>Добавить новую категорию</h2>
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '30%'
        }} onSubmit={submit}>
            <Input type="text" placeholder="Название категории" value={name} onChange={(e) => setName(e.target.value)} />
            <Button type="submit">Добавить</Button>
        </form>
    </div>
  )
}

export default Admin