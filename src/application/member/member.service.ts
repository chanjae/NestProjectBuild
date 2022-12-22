import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../../entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  async memberInfo(mb_idx: number) {
    /**
     * @comments TypeORM - QueryBuilder
     * @param {number} mb_idx
     * @returns Student Info List
     */
    // const memberInfo = await this.dataSource
    //   .getRepository(Member)
    //   .createQueryBuilder('member')
    //   .leftJoinAndSelect(
    //     'member.creditExchangeHistory',
    //     'creditExchangeHistory',
    //   )
    //   .where('creditExchangeHistory.mb_idx = :mb_idx', { mb_idx })
    //   .getOne();
    /**
     * @comments TypeORM - Repository
     * @param {number} mb_idx
     * @returns Student Info List
     */
    const memberInfo = await this.memberRepository.findOne({
      relations: {
        creditExchangeHistory: true,
      },
      where: {
        idx: mb_idx,
      },
    });
    return memberInfo;
  }
  async memberSave(
    first_name: string,
    last_name: string,
    cokili_identification_number: number,
    cokili_email: string,
    password: string,
  ) {
    /**
     * @comments TypeORM - Repository
     * @param {string} name
     * @param {string} like_item
     * @param {number} cokili_identification_number
     * @param {string} cokili_email
     * @param {string} password
     * @returns Member User Save
     */
    const memberSave = await this.memberRepository.save({
      first_name,
      last_name,
      cokili_identification_number,
      cokili_email,
      password,
    });
    return memberSave;
  }
  // async userDelete(name: string) {
  //   /**
  //    * @comments TypeORM - Repository
  //    * @param {string} name
  //    * @returns Student User Delete
  //    */
  //   const userDelete = await this.studentRepository.delete({
  //     name: name,
  //   });
  //   return userDelete;
  // }
  async memberUpdate(first_name: string, last_name: string, idx: number) {
    /**
     * @comments TypeORM - Repository
     * @param {string} first_name
     * @param {string} last_name
     * @param {number} idx
     * @returns Student User Delete
     */
    const userUpdate = await this.memberRepository.update(
      { idx: idx, last_name: last_name }, // Where
      { first_name: first_name }, // Set
    );
    return userUpdate;
  }
  async memberEmailInfo(cokili_email: string) {
    /**
     * @comments TypeORM - Repository
     * @param {string} cokili_email
     * @returns Member Login Check
     */
    const memberEmailInfo = await this.memberRepository.findOne({
      relations: {
        creditExchangeHistory: true,
      },
      where: {
        cokili_email: cokili_email,
      },
    });
    return memberEmailInfo;
  }
}
