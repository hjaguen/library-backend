import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Member } from '../models/Member';

export const getAllMembers = async (req: Request, res: Response) => {
    try {
        const memberRepository = AppDataSource.getRepository(Member);
        const members = await memberRepository.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching members', error });
    }
};

export const createMember = async (req: Request, res: Response) => {
    try {
        const memberRepository = AppDataSource.getRepository(Member);
        const member = memberRepository.create(req.body);
        const result = await memberRepository.save(member);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating member', error });
    }
};

export const getMemberById = async (req: Request, res: Response) => {
    try {
        const memberRepository = AppDataSource.getRepository(Member);
        const member = await memberRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching member', error });
    }
};

export const updateMember = async (req: Request, res: Response) => {
    try {
        const memberRepository = AppDataSource.getRepository(Member);
        const member = await memberRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        memberRepository.merge(member, req.body);
        const result = await memberRepository.save(member);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error updating member', error });
    }
};
