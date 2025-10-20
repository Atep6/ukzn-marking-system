import { Request, Response } from 'express';
import { Script } from '../models/script';
import { Grade } from '../models/grade';
import { AiService } from '../services/aiService';

export class MarkingController {
    private aiService: AiService;

    constructor() {
        this.aiService = new AiService();
    }

    public async uploadMarks(req: Request, res: Response): Promise<void> {
        try {
            const { scriptId, marks } = req.body;
            const script = await Script.findById(scriptId);
            if (!script) {
                res.status(404).send({ message: 'Script not found' });
                return;
            }

            const grade = new Grade({ scriptId, marks });
            await grade.save();
            res.status(201).send({ message: 'Marks uploaded successfully', grade });
        } catch (error) {
            res.status(500).send({ message: 'Error uploading marks', error });
        }
    }

    public async retrieveMarkedScripts(req: Request, res: Response): Promise<void> {
        try {
            const { tutorId } = req.params;
            const markedScripts = await Grade.find({ tutorId }).populate('scriptId');
            res.status(200).send(markedScripts);
        } catch (error) {
            res.status(500).send({ message: 'Error retrieving marked scripts', error });
        }
    }

    public async generateAnswer(req: Request, res: Response): Promise<void> {
        try {
            const { question } = req.body;
            const answer = await this.aiService.generateAnswer(question);
            res.status(200).send({ answer });
        } catch (error) {
            res.status(500).send({ message: 'Error generating answer', error });
        }
    }
}