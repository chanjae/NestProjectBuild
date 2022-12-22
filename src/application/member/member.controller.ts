import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MemberService } from './member.service';
import * as MemberDto from '../../dto/member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  @Get('member_info/:mb_idx')
  async memberInfo(@Param('mb_idx') mb_idx: number) {
    const memberInfo = await this.memberService.memberInfo(mb_idx);
    return Object.assign({
      result: memberInfo,
      resultCode: 1,
    });
  }
  @Post('member_save')
  async memberSave(@Body() createMemberDto: MemberDto.CreateMemberDto) {
    const {
      first_name,
      last_name,
      cokili_identification_number,
      cokili_email,
      password,
    } = createMemberDto;
    try {
      const memberSave = await this.memberService.memberSave(
        first_name,
        last_name,
        cokili_identification_number,
        cokili_email,
        await bcrypt.hash(password, 10),
      );
      return Object.assign({
        result: memberSave,
        resultCode: 1,
      });
    } catch (err) {
      throw new HttpException(
        {
          result: {
            message: err.message,
          },
          resultCode: 0,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('member_update')
  async memberUpdate(@Body() updateMemberDto: MemberDto.UpdateMemberDto) {
    const { first_name, last_name, idx } = updateMemberDto;
    const memberUpdate = await this.memberService.memberUpdate(
      first_name,
      last_name,
      idx,
    );
    return Object.assign({
      result: memberUpdate,
    });
  }
  @Post('member_login')
  async memberLogin(@Body() loginMemberDto: MemberDto.LoginMemberDto) {
    const { cokili_email, password } = loginMemberDto;
    try {
      const memberEmailInfo = await this.memberService.memberEmailInfo(
        cokili_email,
      );
      let validatePassword: boolean;
      memberEmailInfo
        ? (validatePassword = await bcrypt.compare(
            password,
            memberEmailInfo.password,
          ))
        : false;
      if (!memberEmailInfo || !validatePassword) {
        return Object.assign({
          resultCode: 0,
        });
      }
      return Object.assign({
        result: memberEmailInfo,
        resultCode: 1,
      });
    } catch (err) {
      throw new HttpException(
        {
          result: {
            message: err.message,
          },
          resultCode: 0,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
