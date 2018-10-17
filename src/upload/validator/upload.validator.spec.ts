import { expect } from 'chai';
import { Types } from 'mongoose';
import { UploadValidator } from './upload.validator';
import { ValidRequestMocks, responseMock } from './upload.mocks';
import { PropertyInvalidError, IdInvalidError } from '../../utils/errors/userErrors';

describe('Upload Validator Middleware', function () {
    describe('Create Validator', function () {
        context('When valid arguments are passed', function () {
            it('Should not throw an error', function () {
                UploadValidator.canCreate(new ValidRequestMocks().create, responseMock, (error: Error) => {
                    expect(error).to.not.exist;
                });
            });
        });

        context('When invalid arguments are passed', function () {
            it('Should throw an PropertyInvalidError When property is undefined', function () {
                const invalidRequestMock = new ValidRequestMocks().create;
                invalidRequestMock.body.upload.property = undefined;

                UploadValidator.canCreate(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(PropertyInvalidError);
                });
            });

            it('Should throw an PropertyInvalidError When property is null', function () {
                const invalidRequestMock = new ValidRequestMocks().create;
                invalidRequestMock.body.upload.property = null;

                UploadValidator.canCreate(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(PropertyInvalidError);
                });
            });

            it('Should throw an PropertyInvalidError When property is too long', function () {
                const invalidRequestMock = new ValidRequestMocks().create;
                invalidRequestMock.body.upload.property = '122223344214142';

                UploadValidator.canCreate(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(PropertyInvalidError);
                });
            });
        });
    });

    describe('CreateMany Validator', function () {
        context('When valid arguments are passed', function () {
            it('Should not throw an error', function () {
                UploadValidator.canCreateMany(new ValidRequestMocks().createMany, responseMock, (error: Error) => {
                    expect(error).to.not.exist;
                });
            });
        });

        context('When invalid arguments are passed', function () {
            it('Should throw an PropertyInvalidError When property is undefined', function () {
                const invalidRequestMock = new ValidRequestMocks().createMany;
                invalidRequestMock.body.uploads[1].property = undefined;

                UploadValidator.canCreateMany(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(PropertyInvalidError);
                });
            });

            it('Should throw an PropertyInvalidError When property is null', function () {
                const invalidRequestMock = new ValidRequestMocks().createMany;
                invalidRequestMock.body.uploads[1].property = null;

                UploadValidator.canCreateMany(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(PropertyInvalidError);
                });
            });

            it('Should throw an PropertyInvalidError When property is too long', function () {
                const invalidRequestMock = new ValidRequestMocks().createMany;
                invalidRequestMock.body.uploads[1].property = '21412412421412414214';

                UploadValidator.canCreateMany(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(PropertyInvalidError);
                });
            });
        });
    });

    describe('UpdateById Validator', function () {
        context('When valid arguments are passed', function () {
            it('Should not throw an error', function () {
                UploadValidator.canUpdateById(new ValidRequestMocks().updateById, responseMock, (error: Error) => {
                    expect(error).to.not.exist;
                });
            });
        });

        context('When invalid arguments are passed', function () {
            it('Should throw an PropertyInvalidError When property is undefined', function () {
                const invalidRequestMock = new ValidRequestMocks().updateById;
                invalidRequestMock.body.upload.property = undefined;

                UploadValidator.canUpdateById(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(PropertyInvalidError);
                });
            });

            it('Should throw an PropertyInvalidError When property is null', function () {
                const invalidRequestMock = new ValidRequestMocks().updateById;
                invalidRequestMock.body.upload.property = null;

                UploadValidator.canUpdateById(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(PropertyInvalidError);
                });
            });

            it('Should throw an PropertyInvalidError When property is too long', function () {
                const invalidRequestMock = new ValidRequestMocks().updateById;
                invalidRequestMock.body.upload.property = '2142142142141241';

                UploadValidator.canUpdateById(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(PropertyInvalidError);
                });
            });

            it('Should throw an IdInvalidError When id is undefined', function () {
                const invalidRequestMock = new ValidRequestMocks().updateById;
                invalidRequestMock.params.id = undefined;

                UploadValidator.canUpdateById(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(IdInvalidError);
                });
            });

            it('Should throw an IdInvalidError When id is null', function () {
                const invalidRequestMock = new ValidRequestMocks().updateById;
                invalidRequestMock.params.id = null;

                UploadValidator.canUpdateById(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(IdInvalidError);
                });
            });

            it('Should throw an IdInvalidError When id is not a valid ObjectID', function () {
                const invalidRequestMock = new ValidRequestMocks().updateById;
                invalidRequestMock.params.id = '1244';

                UploadValidator.canUpdateById(invalidRequestMock, responseMock, (error: Error) => {
                    expect(error).to.exist;
                    expect(error).to.be.an.instanceof(IdInvalidError);
                });
            });
        });

        describe('canUpdateMany Validator', function () {
            context('When valid arguments are passed', function () {
                it('Should not throw an error', function () {
                    UploadValidator.canUpdateMany(new ValidRequestMocks().updateMany, responseMock, (error: Error) => {
                        expect(error).to.not.exist;
                    });
                });
            });

            context('When invalid arguments are passed', function () {
                it('Should throw an PropertyInvalidError When property is undefined', function () {
                    const invalidRequestMock = new ValidRequestMocks().updateMany;
                    invalidRequestMock.body.upload.property = undefined;

                    UploadValidator.canUpdateMany(invalidRequestMock, responseMock, (error: Error) => {
                        expect(error).to.exist;
                        expect(error).to.be.an.instanceof(PropertyInvalidError);
                    });
                });

                it('Should throw an PropertyInvalidError When property is null', function () {
                    const invalidRequestMock = new ValidRequestMocks().updateMany;
                    invalidRequestMock.body.upload.property = null;

                    UploadValidator.canUpdateMany(invalidRequestMock, responseMock, (error: Error) => {
                        expect(error).to.exist;
                        expect(error).to.be.an.instanceof(PropertyInvalidError);
                    });
                });

                it('Should throw an PropertyInvalidError When property is too long', function () {
                    const invalidRequestMock = new ValidRequestMocks().updateMany;
                    invalidRequestMock.body.upload.property = '21414141412414124';

                    UploadValidator.canUpdateMany(invalidRequestMock, responseMock, (error: Error) => {
                        expect(error).to.exist;
                        expect(error).to.be.an.instanceof(PropertyInvalidError);
                    });
                });
            });
        });

        describe('canDeleteById Validator', function () {
            context('When valid arguments are passed', function () {
                it('Should not throw an error', function () {
                    UploadValidator.canDeleteById(new ValidRequestMocks().deleteById, responseMock, (error: Error) => {
                        expect(error).to.not.exist;
                    });
                });
            });

            context('When invalid arguments are passed', function () {
                it('Should throw an IdInvalidError When id is undefined', function () {
                    const invalidRequestMock = new ValidRequestMocks().deleteById;
                    invalidRequestMock.params.id = undefined;

                    UploadValidator.canDeleteById(invalidRequestMock, responseMock, (error: Error) => {
                        expect(error).to.exist;
                        expect(error).to.be.an.instanceof(IdInvalidError);
                    });
                });

                it('Should throw an IdInvalidError When id is null', function () {
                    const invalidRequestMock = new ValidRequestMocks().deleteById;
                    invalidRequestMock.params.id = undefined;

                    UploadValidator.canDeleteById(invalidRequestMock, responseMock, (error: Error) => {
                        expect(error).to.exist;
                        expect(error).to.be.an.instanceof(IdInvalidError);
                    });
                });

                it('Should throw an IdInvalidError When id is not a valid ObjectID', function () {
                    const invalidRequestMock = new ValidRequestMocks().deleteById;
                    invalidRequestMock.params.id = '1243';

                    UploadValidator.canDeleteById(invalidRequestMock, responseMock, (error: Error) => {
                        expect(error).to.exist;
                        expect(error).to.be.an.instanceof(IdInvalidError);
                    });
                });
            });
        });

        describe('canGetById Validator', function () {
            context('When valid arguments are passed', function () {
                it('Should not throw an error', function () {
                    UploadValidator.canGetById(new ValidRequestMocks().getById, responseMock, (error: Error) => {
                        expect(error).to.not.exist;
                    });
                });
            });

            context('When invalid arguments are passed', function () {
                it('Should throw an IdInvalidError When id is undefined', function () {
                    const invalidRequestMock = new ValidRequestMocks().getById;
                    invalidRequestMock.params.id = undefined;

                    UploadValidator.canGetById(invalidRequestMock, responseMock, (error: Error) => {
                        expect(error).to.exist;
                        expect(error).to.be.an.instanceof(IdInvalidError);
                    });
                });

                it('Should throw an IdInvalidError When id is null', function () {
                    const invalidRequestMock = new ValidRequestMocks().getById;
                    invalidRequestMock.params.id = null;

                    UploadValidator.canGetById(invalidRequestMock, responseMock, (error: Error) => {
                        expect(error).to.exist;
                        expect(error).to.be.an.instanceof(IdInvalidError);
                    });
                });

                it('Should throw an IdInvalidError When id is not a valid ObjectID', function () {
                    const invalidRequestMock = new ValidRequestMocks().getById;
                    invalidRequestMock.params.id = '1234';

                    UploadValidator.canGetById(invalidRequestMock, responseMock, (error: Error) => {
                        expect(error).to.exist;
                        expect(error).to.be.an.instanceof(IdInvalidError);
                    });
                });
            });
        });

        describe('canGetOne Validator', function () {
            context('When valid arguments are passed', function () {
                it('Should not throw an error', function () {
                    UploadValidator.canGetOne(new ValidRequestMocks().getOne, responseMock, (error: Error) => {
                        expect(error).to.not.exist;
                    });
                });
            });
        });

        describe('canGetMany Validator', function () {
            context('When valid arguments are passed', function () {
                it('Should not throw an error', function () {
                    UploadValidator.canGetMany(new ValidRequestMocks().getMany, responseMock, (error: Error) => {
                        expect(error).to.not.exist;
                    });
                });
            });
        });

        describe('canGetAmount Validator', function () {
            context('When valid arguments are passed', function () {
                it('Should not throw an error', function () {
                    UploadValidator.canGetAmount(new ValidRequestMocks().getAmount, responseMock, (error: Error) => {
                        expect(error).to.not.exist;
                    });
                });
            });
        });
    });
});
