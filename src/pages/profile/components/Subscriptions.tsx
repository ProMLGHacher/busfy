import { useEffect, useState } from "react"
import { $api } from "../../../shared/api/api"
import { Sub, SubType } from "../../../features/types/Sub"
import { Input } from "../../../shared/ui/input/Input"
import { Button } from "../../../shared/ui/button/Button"
import { useAppSelector } from "../../../app/store/storeHooks"


export const Subscriptions = () => {

    const userId = useAppSelector(state => state.auth.user?.id)

    const [mySubs, setMySubs] = useState<Sub[]>()

    useEffect(() => {
        $api.get<Sub[]>('/api/subscriptions-created', { params: { userId } }).then(e => setMySubs(e.data))
    }, [])


    const [price, setPrice] = useState("")
    const [type, setType] = useState("Public")
    const [countDays, setCountDays] = useState("")

    return (
        <div>
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <Input value={price} type="number" onChange={e => setPrice(e.target.value)} placeholder="Цена" />
                <select value={type} onChange={e => setType(e.target.value as SubType)} style={{
                    padding: '16px',
                    borderRadius: '50px',
                    border: '1px solid #888',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                }}>
                    <option value="Private">Приватный</option>
                    <option value="Public">Публичный</option>
                    <option value="Single">Единичный</option>
                </select>
                <Input value={countDays} onChange={e => setCountDays(e.target.value)} placeholder="Количество дней" />
                <Button onClick={async () => {
                    await $api.post('/api/subscription', {
                        "price": +price,
                        "type": type,
                        "countDays": countDays
                    })
                    $api.get<Sub[]>('/api/subscriptions-created', { params: { userId } }).then(e => setMySubs(e.data))
                }} >Создать</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {mySubs?.map(e => <div style={{
                    padding: '20px',
                    borderRadius: '50px',
                    border: '1px solid #888',
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <p>{e.type === "Private" ? "Приватный" : e.type === "Public" ? 'Публичный' : 'Единый'} на {e.countDays} дней</p>
                        <p>{e.price} рублей</p>
                    </div>
                    <Button style={{backgroundColor: 'red'}} onClick={async () => {
                        await $api.delete('/api/subscription', { params: { subId: e.id } })
                        $api.get<Sub[]>('/api/subscriptions-created', { params: { userId } }).then(e => setMySubs(e.data))
                    }}>Удалить</Button>
                </div>)}
            </div>
        </div>
    )
}
