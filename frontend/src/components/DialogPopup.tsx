import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser, updateUser } from "@/services/userService";
import { User } from "@/types";

interface DialogPopupProps {
    userToEdit: User | null;
    onClose: () => void;
    onUserUpdated: (user: User) => void;
}

export function DialogPopup({ userToEdit, onUserUpdated, onClose }: DialogPopupProps) {
    const [name, setName] = useState(userToEdit?.name || "");
    const [email, setEmail] = useState(userToEdit?.email || "");

    const handleSaveUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userToEdit) {
            const updatedUser = await updateUser(userToEdit.id, name, email);
            onUserUpdated(updatedUser);
        } else {
            const newUser = await createUser(name, email);
            onUserUpdated(newUser);
        }
        setName("");
        setEmail("");
        onClose();
    };

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
        }
    }, [userToEdit]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                    Add New User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Add the user's required information. Add User when finished.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" placeholder="Enter full name..." value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter valid email address..." className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSaveUser} variant="outline">
                        Add User
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
