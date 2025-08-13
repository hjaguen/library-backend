import { Router } from 'express';
import {
    getAllMembers,
    createMember,
    getMemberById,
    updateMember
} from '../controllers/memberController';

const router = Router();

router.get('/', getAllMembers);
router.post('/', createMember);
router.get('/:id', getMemberById);
router.put('/:id', updateMember);

export default router;
