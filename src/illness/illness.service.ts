import { Injectable } from '@nestjs/common';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Illness } from './models/illness.model';

@Injectable()
export class IllnessService {
  constructor(@InjectModel(Illness) private illnessModel: typeof Illness){}
  create(createIllnessDto: CreateIllnessDto) {
    return this.illnessModel.create(createIllnessDto);
  }

  findAll() {
    return this.illnessModel.findAll();
  }

  findOne(id: number) {
    return this.illnessModel.findByPk(id);
  }

  async update(id: number, updateIllnessDto: UpdateIllnessDto): Promise<Illness> {
    const updatedIllness = await this.illnessModel.update(updateIllnessDto, {where: {id}, returning: true})
    return updatedIllness[1][0]
  }

  remove(id: number) {
    return this.illnessModel.destroy({where: {id}});
  }
}
