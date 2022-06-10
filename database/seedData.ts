interface SeedData {
    entries : seedEntry[]
}

interface seedEntry {
     description: string,
     createdAt: Number,
     status: string,
 }



 export const seedData: SeedData = {
   entries: [
     {
       description:
         'PENDING: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facere consequatur ipsum molestiae cumque ut impedit eos doloremque eligendi, quaerat officiis neque ex ratione autem rem sunt temporibus vitae suscipit.',
       createdAt: Date.now(),
       status: 'pending',
     },
     {
       description:
         'IN-PROGRESS: Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dignissimos tempora, corrupti accusantium voluptate unde repellat molestiae quia? Placeat at voluptatibus deserunt corporis magnam dicta expedita facilis cupiditate rem animi.',
       createdAt: Date.now() - 1561455,
       status: 'in-progress',
     },
     {
       description:
         'PENDING: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facere consequatur ipsum molestiae cumque ut impedit eos doloremque eligendi, quaerat officiis neque ex ratione autem rem sunt temporibus vitae suscipit.',
       createdAt: Date.now() - 984651651,
       status: 'pending',
     },
     {
       description:
         'FINISHED: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facere consequatur ipsum molestiae cumque ut impedit eos doloremque eligendi, quaerat officiis neque ex ratione autem rem sunt temporibus vitae suscipit.',
       createdAt: Date.now() - 100000,
       status: 'finished',
     },
   ],
 };